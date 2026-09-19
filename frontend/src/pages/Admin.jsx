import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth-context'

const API_URL = import.meta.env.VITE_API_URL

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  category: '',
  stock: '',
}

const Admin = () => {
  const { user } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [productForm, setProductForm] = useState(emptyProduct)
  const [image, setImage] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const authHeaders = {
    Authorization: `Bearer ${user?.token}`,
  }

  const readResponse = async (response) => {
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Request failed.')
    }

    return data
  }

  const loadData = async () => {
    setLoading(true)
    setMessage('')

    try {
      const [productsData, usersData, ordersData] = await Promise.all([
        fetch(`${API_URL}/api/products`).then(readResponse),

        fetch(`${API_URL}/api/auth/user`, {
  headers: authHeaders,
}).then(readResponse),

        fetch(`${API_URL}/api/orders`, {
          headers: authHeaders,
        }).then(readResponse),
      ])

      setProducts(productsData)
      setUsers(usersData)
      setOrders(ordersData)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.role === 'admin') {
      loadData()
    }
  }, [user?.role])

  const handleProductChange = (event) => {
    const { name, value } = event.target

    setProductForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const resetProductForm = () => {
    setProductForm(emptyProduct)
    setEditingProduct(null)
    setImage(null)
  }

  const saveProduct = async (event) => {
    event.preventDefault()

    if (!editingProduct && !image) {
      setMessage('Select an image when creating a product.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const body = new FormData()

      Object.entries(productForm).forEach(([key, value]) => {
        body.append(key, value)
      })

      if (image) {
        body.append('image', image)
      }

      const url = editingProduct
        ? `${API_URL}/api/products/${editingProduct._id}`
        : `${API_URL}/api/products`

      const method = editingProduct ? 'PUT' : 'POST'

      await fetch(url, {
        method,
        headers: authHeaders,
        body,
      }).then(readResponse)

      resetProductForm()

      setMessage(
        editingProduct
          ? 'Product updated.'
          : 'Product created.'
      )

      await loadData()
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (product) => {
    setEditingProduct(product)

    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    })

    setImage(null)
    setActiveTab('products')
  }

  const changeOrderStatus = async (orderId, status) => {
    setLoading(true)
    setMessage('')

    try {
      const updatedOrder = await fetch(
        `${API_URL}/api/orders/${orderId}/status`,
        {
          method: 'PUT',
          headers: {
            ...authHeaders,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        }
      ).then(readResponse)

      setOrders((current) =>
        current.map((order) =>
          order._id === orderId
            ? updatedOrder
            : order
        )
      )

      setMessage('Order status updated.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className='p-10 text-center'>
        Please{' '}
        <Link
          className='text-blue-600 underline'
          to='/login'
        >
          log in
        </Link>{' '}
        first.
      </div>
    )
  }

  if (user.role !== 'admin') {
    return (
      <div className='p-10 text-center text-red-600'>
        Admin access is required.
      </div>
    )
  }

  return (
    <main className='min-h-screen bg-gray-100 p-4 sm:p-8'>
      <div className='mx-auto max-w-6xl'>

        <div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
          <div>
            <h1 className='text-3xl font-bold'>
              Admin dashboard
            </h1>

            <p className='text-gray-600'>
              Manage products, customers, and orders.
            </p>
          </div>

          <Link
            to='/'
            className='rounded bg-white px-4 py-2 shadow'
          >
            View store
          </Link>
        </div>

        <div className='mb-6 flex flex-wrap gap-2'>
          {['products', 'users', 'orders'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded px-4 py-2 capitalize ${
                activeTab === tab
                  ? 'bg-black text-white'
                  : 'bg-white'
              }`}
            >
              {tab}
            </button>
          ))}

          <button
            onClick={loadData}
            className='rounded bg-white px-4 py-2'
          >
            Refresh
          </button>
        </div>

        {message && (
          <p className='mb-4 rounded bg-white p-3 shadow'>
            {message}
          </p>
        )}

        {loading && (
          <p className='mb-4'>
            Loading...
          </p>
        )}

        {activeTab === 'products' && (
          <div className='grid gap-6 lg:grid-cols-[380px_1fr]'>

            <form
              onSubmit={saveProduct}
              className='h-fit rounded bg-white p-5 shadow'
            >
              <h2 className='mb-4 text-xl font-semibold'>
                {editingProduct
                  ? 'Update product'
                  : 'Create product'}
              </h2>

              {Object.entries(productForm).map(
                ([name, value]) => (
                  <label
                    key={name}
                    className='mb-3 block capitalize'
                  >
                    {name}

                    {name === 'description' ? (
                      <textarea
                        name={name}
                        value={value}
                        onChange={handleProductChange}
                        required
                        className='mt-1 w-full rounded border p-2'
                      />
                    ) : (
                      <input
                        name={name}
                        type={
                          name === 'price' ||
                          name === 'stock'
                            ? 'number'
                            : 'text'
                        }
                        min={
                          name === 'stock'
                            ? '0'
                            : undefined
                        }
                        step={
                          name === 'price'
                            ? '0.01'
                            : undefined
                        }
                        value={value}
                        onChange={handleProductChange}
                        required
                        className='mt-1 w-full rounded border p-2'
                      />
                    )}
                  </label>
                )
              )}

              <label className='mb-4 block'>
                Image {editingProduct && '(optional)'}

                <input
                  type='file'
                  accept='image/*'
                  onChange={(event) =>
                    setImage(event.target.files[0])
                  }
                  required={!editingProduct}
                  className='mt-1 block w-full'
                />
              </label>

              <div className='flex gap-2'>
                <button
                  disabled={loading}
                  className='rounded bg-green-600 px-4 py-2 text-white'
                >
                  {editingProduct
                    ? 'Save changes'
                    : 'Create product'}
                </button>

                {editingProduct && (
                  <button
                    type='button'
                    onClick={resetProductForm}
                    className='rounded border px-4 py-2'
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className='overflow-x-auto rounded bg-white shadow'>
              <table className='w-full text-left'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='p-3'>Product</th>
                    <th className='p-3'>Price</th>
                    <th className='p-3'>Stock</th>
                    <th className='p-3'>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className='border-t'
                    >
                      <td className='p-3'>
                        {product.name}
                      </td>

                      <td className='p-3'>
                        ₹{product.price}
                      </td>

                      <td className='p-3'>
                        {product.stock}
                      </td>

                      <td className='p-3'>
                        <button
                          onClick={() =>
                            startEdit(product)
                          }
                          className='rounded border px-3 py-1'
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className='overflow-x-auto rounded bg-white shadow'>
            <table className='w-full text-left'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='p-3'>Name</th>
                  <th className='p-3'>Email</th>
                  <th className='p-3'>Role</th>
                </tr>
              </thead>

              <tbody>
                {users.map((customer) => (
                  <tr
                    key={customer._id}
                    className='border-t'
                  >
                    <td className='p-3'>
                      {customer.name}
                    </td>

                    <td className='p-3'>
                      {customer.email}
                    </td>

                    <td className='p-3 capitalize'>
                      {customer.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className='overflow-x-auto rounded bg-white shadow'>
            <table className='w-full text-left'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='p-3'>Order</th>
                  <th className='p-3'>Customer</th>
                  <th className='p-3'>Items</th>
                  <th className='p-3'>Total</th>
                  <th className='p-3'>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className='border-t'
                  >
                    <td className='p-3 font-mono text-xs'>
                      {order._id}
                    </td>

                    <td className='p-3'>
                      {order.userId?.name || 'Unknown'}
                    </td>

                    <td className='p-3'>
                      {order.items.length}
                    </td>

                    <td className='p-3'>
                      ₹{order.totalAmount}
                    </td>

                    <td className='p-3'>
                      <select
                        value={order.status}
                        onChange={(event) =>
                          changeOrderStatus(
                            order._id,
                            event.target.value
                          )
                        }
                        className='rounded border p-1'
                      >
                        <option>Pending</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </main>
  )
}

export default Admin